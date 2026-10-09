const AuthItem = ({ children }) => {
  return (
    <div className=" h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full ">
        {/* grid 1 */}
        <div className="hidden md:block md:col-span-1 h-full">
          <div className="grid grid-row-4 justify-center h-full w-full">
            <div className="col-span-3 h-full">item1</div>
            <div className="col-span-1 h-full">item2</div>
          </div>
        </div>
        {/* grid 2 */}
        <div className="col-span-1 ">
          <div className="flex justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthItem;
