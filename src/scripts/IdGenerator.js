function* IdGenerator() {
  let id = Date.now();
  while (true) {
    yield id;
    id++;
  }
}

const UID = IdGenerator();

export default UID;
