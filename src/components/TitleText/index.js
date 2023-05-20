export default function TitleText({ title, text }) {
  return (
    <>
      <h1 className='h3 mb-3 fw-normal mb-5'>{title}</h1>
      <p className='mb-3'>{text}</p>
    </>
  );
}
