import { FormInputs } from "../../../../types/formularioCrearPartida";

export const incrementMaxPlayersAllowed = (setForm: React.Dispatch<React.SetStateAction<FormInputs>>, 
    form: FormInputs) => {
    if (form.maxPlayers < 4) {
        setForm({
            ...form,
            maxPlayers: form.maxPlayers + 1,
        });
    }
};

export const decrementMaxPlayersAllowed = (setForm: React.Dispatch<React.SetStateAction<FormInputs>>, 
    form: FormInputs) => {
    if (2 < form.maxPlayers && form.minPlayers < form.maxPlayers) {
        setForm({
            ...form,
            maxPlayers: form.maxPlayers - 1,
        });
    }
};

export const incrementMinPlayersAllowed = (setForm: React.Dispatch<React.SetStateAction<FormInputs>>, 
    form: FormInputs) => {
    if (form.minPlayers <= 4 && form.minPlayers < form.maxPlayers) {
        setForm({
            ...form,
            minPlayers: form.minPlayers + 1,
        });
    }
};

export const decrementMinPlayersAllowed = (setForm: React.Dispatch<React.SetStateAction<FormInputs>>, 
    form: FormInputs) => {
    if (2 < form.minPlayers) {
        setForm({
            ...form,
            minPlayers: form.minPlayers - 1,
        });
    }
};