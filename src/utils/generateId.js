async function generateId(doc) {
  const lastAlumni = await doc.constructor
    .findOne({ alumniType: doc.alumniType })
    .sort({ id: -1 })
    .exec();

  let newSequence = 1;
  if (lastAlumni && lastAlumni.id) {
    const lastSequence = parseInt(lastAlumni.id.slice(2), 10);
    newSequence = lastSequence + 1;
  }

  doc.id = `${doc.alumniType}${String(newSequence).padStart(3, '0')}`;
}

module.exports = { generateId };
