import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({dictionary: "alphanum_lower"});

function chunk() {
  return uid.randomUUID(4);
}

export default {
  newid() {
    return `${chunk()}-${chunk()}-${chunk()}-${chunk()}`;
  }
}