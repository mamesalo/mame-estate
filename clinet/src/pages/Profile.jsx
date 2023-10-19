import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <img
          className="rounded-full h-24 w-24 object-cover
          cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkrIN_phrkQozJkBJi9v7jqOEazcPIad5SYA&usqp=CAU"
        />
      </form>
    </div>
  );
}
