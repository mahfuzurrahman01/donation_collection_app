"use client";
// interface for title
type ITitle = {
  title: string;
};
const Title = (title: ITitle) => {
  console.log(title);
  return (
    <div>
      <p className="font-light text-2xl text-gray-300 pb-1 border-b-2 border-green-700 inline uppercase">{title.title}</p>
    </div>
  );
};

export default Title;
