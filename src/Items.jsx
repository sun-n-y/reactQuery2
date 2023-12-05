import { useQuery } from '@tanstack/react-query';
import SingleItem from './SingleItem';
import { authFetch } from './utils';

const Items = ({ items }) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['task'],
    queryFn: () => authFetch.get('/'),
  });

  if (isLoading) {
    return <p style={{ marginTop: '1rem' }}>Loading...</p>;
  }

  if (isError) {
    console.log(error);
    return <p style={{ marginTop: '1rem' }}>{error.message}</p>;
  }

  return (
    <div className="items">
      {data.data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
