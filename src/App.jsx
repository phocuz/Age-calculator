import { useState } from "react";

import arrow from "./assets/icon-arrow.svg"

const AgeCalculator = () => {
  const [formValues, setFormValues] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [age, setAge] = useState(null);

  function calculateAge () {
    const { year, month, day } = formValues;

    if (!year || !month || !day) {
      setAge(null);
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
      setAge(null);
      return;
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(year, month, 0).getDate(); // Adjust days in the month
    }
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormValues((prev) => {
        const updatedValues = { ...prev, [name]: value };
        calculateAgeOnInput(updatedValues); // Trigger age calculation on input change
        return updatedValues;
      });
    }
  };


 function calculateAgeOnInput (updatedValues){

    const { year, month, day } = updatedValues;

    if (!year || !month || !day) {
      setAge(null);
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    if (birthDate > today) {
      setAge(null);
      return;
    }

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(year, month, 0).getDate();
    }
    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
  };

  return (
      <div className="bg-gray-200 h-screen flex justify-center items-center">
  <div className="bg-white flex flex-col justify-center items-center w-[700px] h-[550px] rounded-r-[40px] rounded-l-xl  border border-gray-300">


            <form className="space-y-4">
        <div className="flex space-x-2">
          <div className="space-y-2">
            <label htmlFor="year" className="block uppercase text-2xl">
              Year
            </label>
            <input
              id="year"
              type="text"
              name="year"
              placeholder="Year"
              value={formValues.year}
              onChange={handleChange}
              className="w-[150px] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  text-3xl font-bold"
              />
          </div>
          <div className="space-y-2">
            <label htmlFor="month" className="block uppercase text-xl">
              Month
            </label>
            <input
              id="month"
              type="text"
              name="month"
              placeholder="Month"
              value={formValues.month}
              onChange={handleChange}
              className="w-[150px] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-3xl font-bold"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="day" className="block uppercase text-2xl">
              Day
            </label>
            <input
              id="day"
              type="text"
              name="day"
              placeholder="Day"
              value={formValues.day}
              onChange={handleChange}
              className="w-[159px] p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500  text-3xl font-bold"
              />
          </div>
        </div>
      </form>
<div className="pt-6 relative left-56">
      <div className="bg-black p-4 rounded-full 
      right-10 relative">
        <img src={arrow} alt="arrow-image"   />
      </div>
</div>

      {age && (
        <div className="mt-4 ">
            <p className="text-[4rem] font-bold tracking-tighter "><span className="text-purple-700">{age.years}</span> <span>years</span></p>
            <p className="text-[4rem] font-bold tracking-tighter"><span className="text-purple-700">{age.months}</span><span> months</span></p> 
            <p className="text-[4rem] font-bold tracking-tighter"><span className="text-purple-700">{age.days}</span> <span>days</span></p>
        </div>
      )}
          </div>
      </div>
  );
};

export default AgeCalculator;
