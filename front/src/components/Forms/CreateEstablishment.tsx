import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createEstablishment } from '../../features/establishmentSlice';


function EstablishmentForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const currentUser = useAppSelector(state => state.users.user); 

  const dispatch = useAppDispatch();

  const onNameChanged = e => setName(e.target.value);
  const onDescriptionChanged = e => setDescription(e.target.value);
  const onImageChanged = e => setImage(e.target.files[0]);

  const onSubmit = e => {
    e.preventDefault();

    if (name && description && image && currentUser) { 
      dispatch(createEstablishment({
        establishmentData: {
          name,
          description,
          user: currentUser,
          images: [image],
          reviews: []   
        },
        image
      }));


      setName('');
      setDescription('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={onNameChanged}
      />
      <input
        type="text"
        placeholder="Описание"
        value={description}
        onChange={onDescriptionChanged}
      />
      <input
        type="file"
        onChange={onImageChanged}
      />
      <button type="submit">Создать</button>
    </form>
  );
}

export default EstablishmentForm;