import HeaderOne from "../typography/HeaderOne";
import MainText from "../typography/MainText";

const AuthItem = ({ children }) => {
  return (
    <div className=" min-h-0">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-0 ">
        {/* grid 1 */}
        <div className="hidden md:block md:col-span-1 min-h-0">
          <div className="h-full">
            {" "}
            <div className="h-full rounded-lg bg-white flex justify-center items-center">
              Image
            </div>
            <div className="flex flex-col w-full justify-center items-center  ">
              {" "}
              <HeaderOne
                text={"Send money using just a name."}
                textCenter={true}
              />
              <MainText
                text={"No account numbers. No bank names. Just your Z-ID."}
                textSize={"text-[20px]"}
                textCenter={true}
              />
            </div>
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
