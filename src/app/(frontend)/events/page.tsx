const rowTemplates = {
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
};

export default async function Page() {
  const date = new Date('2025-08');
  // Plus one because we start on sunday
  const firstDay = date.getDay() + 1;
  const monthLen = date.getDate();

  const rowCount = Math.ceil((firstDay + monthLen) / 7);

  let [runCount, dayCount] = [0, 0];


  return (
    <section className="min-h-screen">
      <h1>Event Calendar</h1>
      <div className={`grid ${rowTemplates[rowCount as 4 | 5 | 6]} border border-slate-300 rounded-md h-full`}>
        {(new Array(Math.ceil((firstDay + monthLen) / 7)).fill(0)).map((_, idx) => {
          return (
            <div key={idx} className='grid grid-cols-7 not-last:border-b border-slate-300'>
              {(new Array(7).fill(0)).map((_, jdx) => {
                let dayNum = "";
                if (runCount >= firstDay) {
                  let day = dayCount++ + 1;

                  if (day <= monthLen) {
                    dayNum = day.toString();
                  }
                }
                runCount++;

                return (
                  <div key={jdx} className='not-last:border-r border-slate-300 pt-2'>
                    <span className="ml-2 dark:text-white">{dayNum}</span>
                    <ul>
                    </ul>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </section>
  );
}
