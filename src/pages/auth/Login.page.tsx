import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Grid
        gutter={0}
        style={{
          width: '100%',
          height: '100vh',
          margin: 0,
          padding: 0,
        }}
      >
        <Grid.Col span={{ base: 0, md: 7.2 }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              backgroundImage:
                'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 1,
              borderTopRightRadius: '45px',
              borderBottomRightRadius: '45px',
            }}
          />
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 4.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            height: '100vh',
            minHeight: '100vh',
          }}
        >
          <Container size="sm" style={{ width: '100%', maxWidth: 480 }}>
            <Stack gap="xl">
              <Box>
                <Title order={2} mb="xs">
                  Tizimga kirish
                </Title>
                <Text c="dimmed" size="sm">
                  Telefon raqami va parolingizni kiriting
                </Text>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack gap="md">
                  <TextInput
                    label="Telefon raqami"
                    placeholder="+998901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    required
                    size="md"
                    styles={{
                      input: {
                        backgroundColor: 'var(--mantine-color-grayscales-1)',
                      },
                    }}
                  />

                  <PasswordInput
                    label="Parol"
                    placeholder="Parolingizni kiriting"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                    size="md"
                    styles={{
                      input: {
                        backgroundColor: 'var(--mantine-color-grayscales-1)',
                      },
                    }}
                  />
                  <Button type="submit" fullWidth size="md" loading={loading} mt="md">
                    Kirish
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
