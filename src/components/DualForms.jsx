'use client';

import { useState } from 'react';
import { sha256 } from 'crypto-hash';

export default function DualForms() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="text-orange-500">Únete</span> a nuestra plataforma
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Elige la opción que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Formulario de Registro */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <SignupForm />
          </div>

          {/* Formulario de Contacto */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validación de contraseña en tiempo real
    if (name === 'confirmPassword' || name === 'password') {
      if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
        setPasswordError('Las contraseñas no coinciden');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de contraseña antes de enviar
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPasswordError('');

    try {
      // Hash de la contraseña
      const hashedPassword = await sha256(formData.password);

      const userData = {
        username: formData.username,
        email: formData.email,
        password: hashedPassword
      };

      const response = await fetch('/api/proxy/SignUp/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      alert('¡Registro exitoso! Bienvenido a nuestra plataforma.');

      // Resetear el formulario después de éxito
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error al registrar:', err);
      setError(err.message);
      alert(`Error al registrar: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Crear cuenta nueva</h2>
        <p className="text-gray-700 mt-2">Comienza tu experiencia hoy mismo</p>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-800 mb-1">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            placeholder="Ej: juanperez"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            minLength="8"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            minLength="8"
            placeholder="••••••••"
          />
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading || passwordError}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registrando...' : 'Registrarse ahora'}
        </button>

        <p className="text-xs text-gray-700 text-center mt-4">
          Al registrarte aceptas nuestros <a href="#" className="text-orange-500 hover:underline">Términos y Condiciones</a>
        </p>
      </form>
    </div>
  );
}

function LeadForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/proxy/SignUp/v1/NewProspect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      const data = await response.json();
      console.log('Formulario enviado:', data);
      alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');

      // Resetear el formulario después de éxito
      setFormData({
        nombre: '',
        email: '',
        empresa: '',
        mensaje: ''
      });
    } catch (err) {
      console.error('Error al enviar:', err);
      setError(err.message);
      alert(`Error al enviar el formulario: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Contacta con nosotros</h2>
        <p className="text-gray-700 mt-2">Programa una demostración personalizada</p>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-800 mb-1">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            required
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-800 mb-1">
            Empresa (opcional)
          </label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            placeholder="Nombre de tu empresa"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-800 mb-1">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-gray-800 placeholder-gray-400"
            placeholder="Cuéntanos cómo podemos ayudarte"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Enviando...' : 'Solicitar demostración'}
        </button>

        <p className="text-xs text-gray-700 text-center mt-4">
          Te responderemos en menos de 24 horas hábiles
        </p>
      </form>
    </div>
  );
}