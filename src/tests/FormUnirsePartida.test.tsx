import FormularioUnirsePartida from "../components/views/Public/Home/FormularioUnirsePartida";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

const mockedSets = vi.fn(); 
const mockMaxLonNombres = 20;

test('render formulario de unirse', () => {
    render(<FormularioUnirsePartida idPartida={0} setIdJugador={mockedSets}/>);
    const existe = screen.getByText(/Unirse a Sala:/i); // Veo que se muestre la frase/titulo del form de creacion
    expect(existe).toBeVisible();
});
