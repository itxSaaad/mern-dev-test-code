'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!model || !price || !phone || !city || !images.length) {
      setError('Please fill in all fields');
      return;
    }

    if (phone.length !== 11) {
      setError('Phone number must be exactly 11 digits');
      return;
    }

    if (maxPictures < images.length) {
      setError('Please upload less images');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('model', model);
      formData.append('price', price);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('maxPictures', maxPictures);
      images.forEach((image) => formData.append('images', image));

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/add-car`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.status === 201) {
        setSuccess(true);
        router.push('/');
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > maxPictures) {
      setError(`You can upload up to ${maxPictures} pictures`);
      setImages(files.slice(0, maxPictures));
    } else {
      setImages(files);
      setError('');
    }

    const images = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(images);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
      <form
        className="w-full max-w-md bg-white border border-gray-300 shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Add Car</h1>
        <input
          type="text"
          placeholder="Car Model"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Pictures"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          value={maxPictures}
          onChange={(e) => setMaxPictures(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <div className="flex flex-wrap -mx-2 mb-4">
          {previewImages.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt="Preview"
              className="w-1/4 h-24 object-cover mx-2 mb-2 rounded-md"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && (
          <p className="text-green-500 mt-2">Car added successfully</p>
        )}
      </form>
    </section>
  );
}
