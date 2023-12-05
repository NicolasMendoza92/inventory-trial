
const enableusers = ["mdo@allcot.com", "mco@allcot.com", "hn.ch@allcot.com", "nm@allcot.com", "lmp@allcot.com", 'dvp@allcot.com']

export default function isEnableUser(session) {
  if (enableusers.includes(session?.user.email)) {
    return true;
  } else {
    return false;
  }
}