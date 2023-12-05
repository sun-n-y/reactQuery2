import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authFetch } from './utils';
import { toast } from 'react-toastify';

const SingleItem = ({ item }) => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ id, value }) => authFetch.patch(`/${id}`, { isDone: value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success('item edited');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.msg);
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationFn: ({ id }) => authFetch.delete(`/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success('item deleted');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.msg);
    },
  });

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => editTask({ id: item.id, value: !item.isDone })}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        onClick={() => deleteTask({ id: item.id })}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
