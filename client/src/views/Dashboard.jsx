import { Form } from '~/components';
import { useAuthContext } from '~/util';

export default function Dashboard() {
  const { user, clear } = useAuthContext();

  if (!user) return <h1>Loading...</h1>;

  return (
    <main>
      <h2>Welcome, {user.username}!</h2>
      <Form action="/api/session" method="delete" onSuccess={clear}>
        <button>Logout</button>
      </Form>
    </main>
  );
}