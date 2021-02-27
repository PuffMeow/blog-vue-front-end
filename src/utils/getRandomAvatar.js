export default function getRandomAvatar() {
  const index = Math.round(Math.random() * 11) + 1;
  return require(`@/assets/miniAvatar/${index}.jpg`);
}