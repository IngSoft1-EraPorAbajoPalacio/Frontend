
export function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
}

export function handleAliasChange(e: React.ChangeEvent<HTMLInputElement>, setAlias: React.Dispatch<React.SetStateAction<string>>) {
    if(validateNames(e.target.value))setAlias(e.target.value);
}

export const validateNames = (name: string) => {
    return name.length <= 20;
};