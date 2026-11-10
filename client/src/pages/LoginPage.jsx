import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../components/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ErrorMessage from '../components/ui/ErrorMessage';
import { loginSchema } from '../schemas/loginSchema';
import { useLogin } from '../hooks/useLogin';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { email, password } = watch();
  const hasInput = Boolean(email || password);
  const isLoading = isSubmitting || loginMutation.isPending;
  const isDisabled = (hasInput && !isValid) || isLoading;

  const onSubmit = (data) => {
    setServerError('');
    loginMutation.mutate(data, {
      onSuccess: () => navigate('/', { replace: true }),
      onError: (err) => {
        const msg = err?.response?.data?.message || 'Login failed. Please try again.';
        setServerError(msg);
      },
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Logo asLink={false} />
        </header>

        <div className={styles.content}>
          <div className={styles.hero}>
            <h1 className={styles.title}>
              Your medication, delivered Say goodbye to all{' '}
              <span className={styles.titleAccent}>your healthcare</span> worries with us
            </h1>
            <img src="/pill.webp" alt="" className={styles.pill} aria-hidden="true" />
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <Input
                type="email"
                placeholder="Email address"
                autoComplete="email"
                error={Boolean(errors.email)}
                {...register('email')}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            <div className={styles.field}>
              <Input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                {...register('password')}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>

            {serverError && (
              <div className={styles.serverError}>
                <ErrorMessage>{serverError}</ErrorMessage>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isDisabled}
              loading={isLoading}
            >
              Log in
            </Button>
          </form>
        </div>

        <img src="/elements.webp" alt="" className={styles.bgElements} aria-hidden="true" />
      </div>
    </div>
  );
}
