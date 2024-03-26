import { Tab, TabContainer, Form, Field } from '~/components';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const goToDashboard = () => navigate("/dashboard");

  return (
    <TabContainer>
      <Tab title="Login">
        <Form
          action="/api/session"
          method="post"
          onSuccess={goToDashboard}
        >
          <Field
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength={5}
            autoComplete="email"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={8}
            autoComplete="current-password"
          />
          <button>Submit</button>
        </Form>
      </Tab>
      <Tab title="Sign Up">
        <Form
          action="/api/users"
          method="post"
          onSuccess={goToDashboard}
        >
          <Field
            type="text"
            name="username"
            placeholder="Username"
            required
            minLength={3}
            autoComplete="username"
          />
          <Field
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength={5}
            autoComplete="email"
          />
          <Field
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={8}
            autoComplete="new-password"
          />
          <button>Submit</button>
        </Form>
      </Tab>
    </TabContainer>
  );
}