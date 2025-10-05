export function FirestoreDate(ts) {
  return new Date(ts.seconds * 1000 + ts.nanoseconds / 1000000);
}
