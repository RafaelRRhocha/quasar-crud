import { api } from 'src/boot/axios';

export default function useApi(url) {
  const get = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const post = async (body) => {
    try {
      const { data } = await api.post(url, body);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const update = async (body) => {
    try {
      const { data } = await api.put(`${url}/${body.id}`, body);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`${url}/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    get,
    post,
    update,
    remove,
    getById,
  };
}
