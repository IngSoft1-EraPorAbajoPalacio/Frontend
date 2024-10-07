import FormCreateRoom from "../components/views/Public/Home/FormularioCrearPartida";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('render formulario de creacion', () => {
    render(<FormCreateRoom setIdPartida={() => {}} setIdJugador={() => {}} />);
    const existe = screen.getByText(/Nombre de partida:/i);
    expect(existe).toBeInTheDocument();
});