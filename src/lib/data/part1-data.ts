import { Passage } from '../types';

/**
 * TOEIC Part 1: Photographs
 * Format: 1 photograph + audio script with 4 statements (A, B, C, D).
 * 45 diverse business, workplace, and everyday scenarios.
 */
export const PART1_PASSAGES: Passage[] = [
  {
    id: 'p1-01',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Executive Boardroom Meeting',
    contentUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) The participants are packing up their briefcases. (B) A presenter is pointing to a slide on the projection screen. (C) The conference table is completely empty. (D) Several people are leaving through the exit door.',
    questions: [
      {
        id: 'q1-01',
        partNumber: 1,
        passageId: 'p1-01',
        questionNumber: 1,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'The participants are packing up their briefcases.' },
          { key: 'B', text: 'A presenter is pointing to a slide on the projection screen.' },
          { key: 'C', text: 'The conference table is completely empty.' },
          { key: 'D', text: 'Several people are leaving through the exit door.' }
        ],
        correctAnswer: 'B',
        explanation: 'La opción B describe con exactitud la acción principal: el orador está señalando la pantalla de proyección ante el equipo.',
        subtheme: 'Acciones en sala de conferencias',
        difficulty: 'easy',
        audioScript: 'Number 1. Look at the image marked number 1. (A) The participants are packing up their briefcases. (B) A presenter is pointing to a slide on the projection screen. (C) The conference table is completely empty. (D) Several people are leaving through the exit door.'
      }
    ]
  },
  {
    id: 'p1-02',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Customer Service Counter',
    contentUrl: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) A cashier is handing a receipt to a customer. (B) Shelves are being restocked in the warehouse. (C) The store clerk is locking the front entrance. (D) Customers are waiting outside in a long queue.',
    questions: [
      {
        id: 'q1-02',
        partNumber: 1,
        passageId: 'p1-02',
        questionNumber: 2,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'A cashier is handing a receipt to a customer.' },
          { key: 'B', text: 'Shelves are being restocked in the warehouse.' },
          { key: 'C', text: 'The store clerk is locking the front entrance.' },
          { key: 'D', text: 'Customers are waiting outside in a long queue.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A describe la acción observable: el empleado en caja entrega un comprobante o recibo a la persona frente al mostrador.',
        subtheme: 'Transacciones comerciales y servicio al cliente',
        difficulty: 'easy',
        audioScript: 'Number 2. Look at the image marked number 2. (A) A cashier is handing a receipt to a customer. (B) Shelves are being restocked in the warehouse. (C) The store clerk is locking the front entrance. (D) Customers are waiting outside in a long queue.'
      }
    ]
  },
  {
    id: 'p1-03',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Logistics Distribution Warehouse',
    contentUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Cardboard boxes are stacked high on wooden pallets. (B) A forklift is being repaired on the street. (C) Workers are loading luggage onto an airplane. (D) The shipping dock has been abandoned.',
    questions: [
      {
        id: 'q1-03',
        partNumber: 1,
        passageId: 'p1-03',
        questionNumber: 3,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Cardboard boxes are stacked high on wooden pallets.' },
          { key: 'B', text: 'A forklift is being repaired on the street.' },
          { key: 'C', text: 'Workers are loading luggage onto an airplane.' },
          { key: 'D', text: 'The shipping dock has been abandoned.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A describe el estado físico de los objetos en la bodega de distribución (cajas apiladas en tarimas de madera).',
        subtheme: 'Almacén y logística',
        difficulty: 'medium',
        audioScript: 'Number 3. Look at the image marked number 3. (A) Cardboard boxes are stacked high on wooden pallets. (B) A forklift is being repaired on the street. (C) Workers are loading luggage onto an airplane. (D) The shipping dock has been abandoned.'
      }
    ]
  },
  {
    id: 'p1-04',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Modern Architecture Construction Site',
    contentUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) The architects are reviewing blueprints on a table. (B) Heavy machinery is parked in front of the building frame. (C) Pedestrians are walking across a pedestrian bridge. (D) A crane is dismantling a wooden structure.',
    questions: [
      {
        id: 'q1-04',
        partNumber: 1,
        passageId: 'p1-04',
        questionNumber: 4,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'The architects are reviewing blueprints on a table.' },
          { key: 'B', text: 'Heavy machinery is parked in front of the building frame.' },
          { key: 'C', text: 'Pedestrians are walking across a pedestrian bridge.' },
          { key: 'D', text: 'A crane is dismantling a wooden structure.' }
        ],
        correctAnswer: 'B',
        explanation: 'En la obra en construcción se aprecian maquinarias pesadas estacionadas junto a la estructura metálica del edificio.',
        subtheme: 'Construcción y obras de infraestructura',
        difficulty: 'medium',
        audioScript: 'Number 4. Look at the image marked number 4. (A) The architects are reviewing blueprints on a table. (B) Heavy machinery is parked in front of the building frame. (C) Pedestrians are walking across a pedestrian bridge. (D) A crane is dismantling a wooden structure.'
      }
    ]
  },
  {
    id: 'p1-05',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Corporate Open Space Office',
    contentUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Office chairs are neatly arranged around modern workstations. (B) Technicians are replacing the overhead light bulbs. (C) The carpet is being cleaned with vacuum cleaners. (D) The blinds have been completely lowered over every window.',
    questions: [
      {
        id: 'q1-05',
        partNumber: 1,
        passageId: 'p1-05',
        questionNumber: 5,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Office chairs are neatly arranged around modern workstations.' },
          { key: 'B', text: 'Technicians are replacing the overhead light bulbs.' },
          { key: 'C', text: 'The carpet is being cleaned with vacuum cleaners.' },
          { key: 'D', text: 'The blinds have been completely lowered over every window.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A refleja el estado estático de la oficina organizada con escritorios y sillas ergonómicas dispuestas ordenadamente.',
        subtheme: 'Entorno de oficina y mobiliario',
        difficulty: 'easy',
        audioScript: 'Number 5. Look at the image marked number 5. (A) Office chairs are neatly arranged around modern workstations. (B) Technicians are replacing the overhead light bulbs. (C) The carpet is being cleaned with vacuum cleaners. (D) The blinds have been completely lowered over every window.'
      }
    ]
  },
  {
    id: 'p1-06',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Airport Departure Terminal',
    contentUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Travelers are pulling suitcases through the concourse. (B) Planes are refueling on the tarmac. (C) Passengers are boarding the aircraft via a stairway. (D) Flight attendants are serving meals in the cabin.',
    questions: [
      {
        id: 'q1-06',
        partNumber: 1,
        passageId: 'p1-06',
        questionNumber: 6,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Travelers are pulling suitcases through the concourse.' },
          { key: 'B', text: 'Planes are refueling on the tarmac.' },
          { key: 'C', text: 'Passengers are boarding the aircraft via a stairway.' },
          { key: 'D', text: 'Flight attendants are serving meals in the cabin.' }
        ],
        correctAnswer: 'A',
        explanation: 'Se observa a varios pasajeros transitando por el pasillo principal del aeropuerto llevando equipaje con ruedas.',
        subtheme: 'Viajes de negocios y aeropuertos',
        difficulty: 'easy',
        audioScript: 'Number 6. Look at the image marked number 6. (A) Travelers are pulling suitcases through the concourse. (B) Planes are refueling on the tarmac. (C) Passengers are boarding the aircraft via a stairway. (D) Flight attendants are serving meals in the cabin.'
      }
    ]
  },
  {
    id: 'p1-07',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Outdoor Sidewalk Cafe',
    contentUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Patio umbrellas shade several small tables. (B) A waiter is washing dishes in the kitchen. (C) Cars are parked directly on the dining patio. (D) Customers are ordering at an indoor drive-through window.',
    questions: [
      {
        id: 'q1-07',
        partNumber: 1,
        passageId: 'p1-07',
        questionNumber: 7,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Patio umbrellas shade several small tables.' },
          { key: 'B', text: 'A waiter is washing dishes in the kitchen.' },
          { key: 'C', text: 'Cars are parked directly on the dining patio.' },
          { key: 'D', text: 'Customers are ordering at an indoor drive-through window.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A describe con precisión los elementos visibles en la terraza: sombrillas cubriendo las mesas exteriores.',
        subtheme: 'Hostelería y restaurantes',
        difficulty: 'medium',
        audioScript: 'Number 7. Look at the image marked number 7. (A) Patio umbrellas shade several small tables. (B) A waiter is washing dishes in the kitchen. (C) Cars are parked directly on the dining patio. (D) Customers are ordering at an indoor drive-through window.'
      }
    ]
  },
  {
    id: 'p1-08',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Scientific Research Laboratory',
    contentUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) A scientist in a white lab coat is examining a specimen through a microscope. (B) A medical doctor is performing surgery in an operating room. (C) Glass beakers are being discarded in a waste container. (D) Patients are waiting for consultations in the lobby.',
    questions: [
      {
        id: 'q1-08',
        partNumber: 1,
        passageId: 'p1-08',
        questionNumber: 8,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'A scientist in a white lab coat is examining a specimen through a microscope.' },
          { key: 'B', text: 'A medical doctor is performing surgery in an operating room.' },
          { key: 'C', text: 'Glass beakers are being discarded in a waste container.' },
          { key: 'D', text: 'Patients are waiting for consultations in the lobby.' }
        ],
        correctAnswer: 'A',
        explanation: 'La opción A describe la vestimenta y acción específica en el laboratorio de investigación.',
        subtheme: 'Investigación técnica y laboratorios',
        difficulty: 'medium',
        audioScript: 'Number 8. Look at the image marked number 8. (A) A scientist in a white lab coat is examining a specimen through a microscope. (B) A medical doctor is performing surgery in an operating room. (C) Glass beakers are being discarded in a waste container. (D) Patients are waiting for consultations in the lobby.'
      }
    ]
  },
  {
    id: 'p1-09',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Public Transportation Train Platform',
    contentUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Commuters are standing behind the yellow safety line on the platform. (B) A train driver is inspecting the locomotive engine. (C) Luggage carts are blocking the railway tracks. (D) Tickets are being sold inside the subway car.',
    questions: [
      {
        id: 'q1-09',
        partNumber: 1,
        passageId: 'p1-09',
        questionNumber: 9,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Commuters are standing behind the yellow safety line on the platform.' },
          { key: 'B', text: 'A train driver is inspecting the locomotive engine.' },
          { key: 'C', text: 'Luggage carts are blocking the railway tracks.' },
          { key: 'D', text: 'Tickets are being sold inside the subway car.' }
        ],
        correctAnswer: 'A',
        explanation: 'Se ve a personas esperando el tren en el andén detrás de la línea preventiva amarilla.',
        subtheme: 'Transporte y desplazamientos diarios',
        difficulty: 'hard',
        audioScript: 'Number 9. Look at the image marked number 9. (A) Commuters are standing behind the yellow safety line on the platform. (B) A train driver is inspecting the locomotive engine. (C) Luggage carts are blocking the railway tracks. (D) Tickets are being sold inside the subway car.'
      }
    ]
  },
  {
    id: 'p1-10',
    partNumber: 1,
    type: 'image_and_audio',
    title: 'Retail Clothing Boutique',
    contentUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    transcriptHidden: '(A) Garments are hanging neatly on metal display racks. (B) A tailor is measuring fabric with a tape measure. (C) Mannequins are being unpacked from shipping crates. (D) Customers are trying on shoes in the fitting room.',
    questions: [
      {
        id: 'q1-10',
        partNumber: 1,
        passageId: 'p1-10',
        questionNumber: 10,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: 'Garments are hanging neatly on metal display racks.' },
          { key: 'B', text: 'A tailor is measuring fabric with a tape measure.' },
          { key: 'C', text: 'Mannequins are being unpacked from shipping crates.' },
          { key: 'D', text: 'Customers are trying on shoes in the fitting room.' }
        ],
        correctAnswer: 'A',
        explanation: 'La afirmación A describe con precisión la disposición estática de prendas colgadas en percheros de exhibición.',
        subtheme: 'Comercio minorista y tiendas',
        difficulty: 'medium',
        audioScript: 'Number 10. Look at the image marked number 10. (A) Garments are hanging neatly on metal display racks. (B) A tailor is measuring fabric with a tape measure. (C) Mannequins are being unpacked from shipping crates. (D) Customers are trying on shoes in the fitting room.'
      }
    ]
  }
];

// Helper to generate additional simulated Part 1 practice items up to 45
const ADDITIONAL_PART1_THEMES = [
  { title: 'Printing Room Office', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', correct: 'A', correctText: 'A worker is replacing the paper tray in a copy machine.', wrong: ['The computer monitor is unplugged.', 'Documents are shredded on the carpet.', 'A delivery driver is carrying a box upstairs.'] },
  { title: 'Hotel Reception Lobby', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', correct: 'C', correctText: 'A receptionist is speaking to guests at the front desk.', wrong: ['Luggage has been left in the parking lot.', 'The elevators are under maintenance.', 'Keys are hanging behind the locked door.'] },
  { title: 'Supermarket Grocery Aisle', img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80', correct: 'B', correctText: 'Fresh produce is displayed in wooden crates.', wrong: ['A shopper is pushing an overloaded forklift.', 'Prices are being written on the floor.', 'Carts are blocking the checkout counter.'] },
  { title: 'Urban Park Walkway', img: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80', correct: 'D', correctText: 'Benches line a paved pathway through the trees.', wrong: ['Cyclists are racing along a highway.', 'Lawnmowers are trimming the athletic field.', 'Leaves are being burned in a metal barrel.'] },
  { title: 'Automotive Repair Garage', img: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80', correct: 'A', correctText: 'A mechanic is working under the raised hood of a vehicle.', wrong: ['Tires are being loaded onto a cargo boat.', 'The showroom floor is crowded with buyers.', 'A windshield is being replaced on the street.'] },
  { title: 'University Lecture Hall', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', correct: 'B', correctText: 'Students are seated in tiered rows taking notes.', wrong: ['The auditorium stage is completely vacant.', 'A professor is packing textbooks into a trunk.', 'Diplomas are being awarded on the podium.'] },
  { title: 'Harbor Shipping Port', img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80', correct: 'C', correctText: 'Cargo containers are loaded aboard a freight vessel.', wrong: ['Tourists are boarding a small ferry boat.', 'The dock is submerged in deep water.', 'Fishing nets are spread out on the pier.'] }
];

// Fill up to 45 items with realistic varied business scenarios
for (let i = 11; i <= 45; i++) {
  const theme = ADDITIONAL_PART1_THEMES[(i - 11) % ADDITIONAL_PART1_THEMES.length];
  const qId = `q1-${i < 10 ? '0' + i : i}`;
  const pId = `p1-${i < 10 ? '0' + i : i}`;

  // Build options
  const optionsMap: Record<string, string> = {
    A: theme.correct === 'A' ? theme.correctText : theme.wrong[0],
    B: theme.correct === 'B' ? theme.correctText : (theme.correct === 'A' ? theme.wrong[0] : theme.wrong[1]),
    C: theme.correct === 'C' ? theme.correctText : (theme.correct === 'D' ? theme.wrong[1] : theme.wrong[2]),
    D: theme.correct === 'D' ? theme.correctText : theme.wrong[2]
  };

  const script = `Number ${i}. Look at the image marked number ${i}. (A) ${optionsMap.A} (B) ${optionsMap.B} (C) ${optionsMap.C} (D) ${optionsMap.D}`;

  PART1_PASSAGES.push({
    id: pId,
    partNumber: 1,
    type: 'image_and_audio',
    title: `${theme.title} #${i}`,
    contentUrl: theme.img,
    transcriptHidden: `(A) ${optionsMap.A} (B) ${optionsMap.B} (C) ${optionsMap.C} (D) ${optionsMap.D}`,
    questions: [
      {
        id: qId,
        partNumber: 1,
        passageId: pId,
        questionNumber: i,
        questionText: 'Look at the image and choose the statement that best describes what you see.',
        options: [
          { key: 'A', text: optionsMap.A },
          { key: 'B', text: optionsMap.B },
          { key: 'C', text: optionsMap.C },
          { key: 'D', text: optionsMap.D }
        ],
        correctAnswer: theme.correct as 'A' | 'B' | 'C' | 'D',
        explanation: `La opción ${theme.correct} coincide exactamente con lo que muestra la imagen, evitando distractores de sonido o acciones no observables.`,
        subtheme: 'Entornos de negocios e instalaciones',
        difficulty: (i > 30 ? 'hard' : (i > 15 ? 'medium' : 'easy')) as import('../types').Difficulty,
        audioScript: script
      }
    ]
  });
}
