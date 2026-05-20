import { RIDES, type Ride, type Verdict, type LightningLane } from '@/lib/content'

export { RIDES as rides, type Ride, type Verdict, type LightningLane }

export function getAgeRatings(ride: Ride): {
  age2: Verdict
  age4: Verdict
  age6: Verdict
  age8: Verdict
} {
  return { age2: ride.age2, age4: ride.age4, age6: ride.age6, age8: ride.age8 }
}

export function getLightningLane(ride: Ride): LightningLane {
  if (ride.llType === 'MP') return 'multi-pass'
  if (ride.llType === 'SP') return 'single-pass'
  return 'none'
}

export function findRideById(id: string): Ride | undefined {
  return RIDES.find((r) => r.id === id)
}
