import { FieldValues, useForm } from 'react-hook-form';
import axios, { CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import httpService from '../../HttpService/http-service';

interface Book {
  id: number;
  title: string;
  release_year: number;
}

function Book() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');
  const [Title, setTitle] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Book>();

  const bookService = new httpService('books');



  useEffect(() => {
    const { request, controller } = bookService.getAll();
    request
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);





  const onSubmit = (data: Book) => {
    const request = bookService.add(data);

    const original = [...books];
    setBooks([...books, data]);
    request
      .then(res => {
        console.log(res.data);
        reset();
      })
      .catch(err => {
        setBooks(original);
        setError(err.message);
      });
  };





  const onDelete = (id: number) => {
    const request = bookService.delete(id);

    const original = [...books];
    setBooks(books.filter(b => b.id !== id));
    request
      .then(res => console.log(res.data))
      .catch(err => {
        setBooks(original);
        setError(err.message);
      });
  };



  
  const onUpdate = (id: number, oldBook: Book) => {
    const original = [...books];
    const newBook = { ...oldBook, title: Title };
    setBooks(books.map(b => (b.id === id ? newBook : b)));
    console.log(books);
    const request = bookService.update(id, newBook);

    request
      .then(res => {
        reset();
      })
      .catch(err => {
        setError(err);
        setBooks(original);
      });
  };





  return (
    <div className='p-9 full bg-black h-screen'>
      <form className='flex flex-col justify-start items-center' onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-manrope font-bold text-3xl text-red-500">There is an error: {error}</h1>

        <label className="font-manrope font-bold text-white text-lg">Title</label>
        <input
          {...register('title', { required: true })}
          className='hover:outline-none bg-black text-white border-2 border-indigo-500 rounded-md'
          type="text"
        />
        {errors.title?.type === 'required' && <p>Title is required</p>}

        <label className="font-manrope font-bold text-white text-lg">Release year</label>
        <input
          {...register('release_year', { required: true })}
          className='hover:outline-none bg-black text-white border-2 border-indigo-500 rounded-md'
          type="number"
        />
        {errors.release_year?.type === 'required' && <p>Release year is required</p>}

        <button className='hover:bg-indigo-700 font-manrope font-bold mt-2 bg-indigo-600 rounded-lg w-32 h-9' type="submit">Add</button>

        <ul className='mt-9'>
          {books.map(b => (
            <li key={b.id} className='font-manrope font-semibold text-sm text-white'>
              <div>
                {b.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{b.release_year}
                <button
                  onClick={() => onDelete(b.id)}
                  className='hover:bg-indigo-700 font-manrope font-bold mt-2 bg-indigo-600 ml-6 rounded-lg w-20 h-6 text-black'>
                  Delete
                </button>
              </div>
              <div>
                <input
                  onChange={e => setTitle(e.target.value)}
                  defaultValue={b.title}
                  className='hover:outline-none bg-black text-white border-2 border-indigo-500 rounded-md'
                  type="text"
                />
                <button
                  onClick={() => onUpdate(b.id, b)}
                  className='mb-9 hover:bg-indigo-700 font-manrope font-bold mt-2 bg-indigo-600 ml-6 rounded-lg w-24 h-6 text-black'
                  type='submit'>
                  Update Title
                </button>
              </div>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default Book;