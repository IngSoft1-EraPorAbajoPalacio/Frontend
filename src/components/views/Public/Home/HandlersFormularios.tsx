import { FormInputs } from '../../../../types/formularioCrearPartida.ts';

export const handleRoomNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs
) => {
    if (validateNames(e.target.value)) {
        setForm({
            ...form,
            room: e.target.value,
        });
    } else {
        e.target.setCustomValidity('Por favor, ingrese el nombre de la sala.');
    }
};

export const handlePlayerNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs
) => {
    if (validateNames(e.target.value)) {
        setForm({
            ...form,
            playerName: e.target.value,
        });
    }
};

export function handleAliasChange(e: React.ChangeEvent<HTMLInputElement>, setAlias: React.Dispatch<React.SetStateAction<string>>) {
    if (validateNames(e.target.value)) setAlias(e.target.value);
}

export const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('Por favor, rellene el campo.');
};

export const handleValid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.target.setCustomValidity('');
};

const validateNames = (name: string) => {
    return name.length <= 20;
};