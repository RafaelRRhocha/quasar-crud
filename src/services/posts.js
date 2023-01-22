import useApi from 'src/composables/UseApi';

export default function postsService() {
  const {
    get, post, update, remove,
  } = useApi('posts');

  return {
    get,
    post,
    update,
    remove,
  };
}
