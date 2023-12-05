import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authFetch } from './utils';
import { toast } from 'react-toastify';

export const useFetchTasks = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ['task'],
    queryFn: () => authFetch.get('/'),
  });
  return { isError, isLoading, data };
};

export const useEditTask = () => {
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
  return editTask;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
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
  return { deleteTask };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isLoading } = useMutation({
    mutationFn: (taskTitle) => authFetch.post('/', { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success('task added');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.msg);
    },
  });
  return { createTask, isLoading };
};
