export default async function Page() {
  return (
    <div className="grid grid-rows-5 border border-slate-300 rounded-md">
      {(new Array(5).fill(0)).map((_, idx) => {
        return (
          <div className='grid grid-cols-7 not-last:border-b border-slate-300'>
            {(new Array(7).fill(0)).map((_, jdx) => {
              return (
                <div className='not-last:border-r border-slate-300 min-h-10'>
                  s
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}
