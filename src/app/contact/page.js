export default function Home() {
  return (
    <div className="p-4 flex flex-col items-center justify-center text-white">
      <p className="text-5xl text-center mb-10 mt-10">CONTACT</p>
      
      <div className="p-4 flex flex-row items-center justify-center text-white gap-12">
        <img src="Sivarit.jpg" className="rounded-full w-[150px] h-[220px] " alt="Contact Image" />
        <p className="text-center text-2xl mt-2 font-bold">Sivarit Atsawasapphayakit</p>
        <p className="text-center text-2xl mt-2">Student ID: 6607144</p>
        <p className="text-center text-2xl mt-2">Project Web</p>
      </div>
    
      <div className="p-4 flex flex-row items-center justify-center text-white gap-12">
        <img src="Ponarnun2.jpg" className="rounded-full w-[150px] h-[220px]" alt="Contact Image" />
        <p className="text-center text-2xl mt-2 font-bold">Ponarnun Sakeawrueangrit</p>
        <p className="text-center text-2xl mt-2">Student ID: 6605945</p>  
        <p className="text-center text-2xl mt-2">Project Web</p>
      </div>

      {/* เฟิร์น */}
      <div className="p-4 flex flex-row items-center justify-center text-white gap-12">
        <img src="A.jpg" className="rounded-full w-[150px] h-[220px]" alt="Contact Image" style={{ marginLeft: "-130px" }}/>
        <p className="text-center text-2xl mt-2 font-bold">Atitaya Kaenjak</p>
        <p className="text-center text-2xl mt-2">Student ID: 6604386</p>
        <p className="text-center text-2xl mt-2">Project Web</p>  
      </div>

    </div>
  );
}
