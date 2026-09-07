'use client';

import { useEffect, useState } from 'react';
import { getSupabaseClient, isSupabaseConfigured } from './client';
import { useTOEICStore } from '../store';
import { ReviewItem, UserStats } from '../types';

export interface AuthUserState {
  user: any | null;
  loading: boolean;
  isLoggedIn: boolean;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'local_only' | 'error';
  lastSyncedAt: string | null;
}

/**
 * Syncs user data between Zustand and Supabase PostgreSQL tables:
 * - profiles
 * - review_bank
 * - user_stats
 */
export const syncStoreWithCloud = async (userId: string) => {
  const supabase = getSupabaseClient();
  if (!supabase || !userId) return;

  try {
    const store = useTOEICStore.getState();

    // 1. Ensure profile exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!profile) {
      await supabase.from('profiles').insert({
        user_id: userId,
        nombre: 'Estudiante TOEIC',
        nivel_actual: 'Intermedio',
        puntaje_meta: 850
      });
    }

    // 2. Fetch Review Bank from Supabase
    const { data: cloudReviewItems, error: reviewErr } = await supabase
      .from('review_bank')
      .select('*')
      .eq('user_id', userId);

    if (!reviewErr && cloudReviewItems && cloudReviewItems.length > 0) {
      // Merge with local review bank
      const currentBank = { ...store.reviewBank };
      cloudReviewItems.forEach((item: any) => {
        if (currentBank[item.question_id]) {
          currentBank[item.question_id] = {
            ...currentBank[item.question_id],
            missedCount: Math.max(currentBank[item.question_id].missedCount, item.veces_fallada),
            isMastered: item.dominado || currentBank[item.question_id].isMastered,
            correctInARow: item.aciertos_consecutivos
          };
        }
      });
      useTOEICStore.setState({ reviewBank: currentBank });
    }

    // 3. Upload any local review bank items to Cloud
    const localItems = Object.values(store.reviewBank);
    if (localItems.length > 0) {
      const recordsToUpsert = localItems.map(item => ({
        user_id: userId,
        question_id: item.questionId,
        veces_fallada: item.missedCount,
        aciertos_consecutivos: item.correctInARow,
        dominado: item.isMastered,
        actualizado_en: new Date().toISOString()
      }));

      await supabase
        .from('review_bank')
        .upsert(recordsToUpsert, { onConflict: 'user_id,question_id' });
    }

    return true;
  } catch (err) {
    console.error('Error syncing store with cloud:', err);
    return false;
  }
};

/**
 * Upsert a single review item immediately to Supabase
 */
export const saveReviewItemToCloud = async (item: ReviewItem) => {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('review_bank').upsert({
      user_id: user.id,
      question_id: item.questionId,
      veces_fallada: item.missedCount,
      aciertos_consecutivos: item.correctInARow,
      dominado: item.isMastered,
      actualizado_en: new Date().toISOString()
    }, { onConflict: 'user_id,question_id' });
  } catch (err) {
    console.warn('Could not save review item to cloud:', err);
  }
};
