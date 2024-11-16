const InfoRow = ({ text, info }: { text: string; info: string }) => {
  return (
    <div className='text-lg md:text-xl text-gray-700 flex flex-row gap-2'>
      <strong className='text-gray-800'>{text}</strong>
      <p>{info}</p>
    </div>
  );
};

export default InfoRow;

