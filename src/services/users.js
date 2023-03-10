import useApi from 'src/composables/UseApi';

export default function usersService() {
  const {
    get, post, update, remove, getById,
  } = useApi('users');

  return {
    get,
    post,
    update,
    remove,
    getById,
  };
}
