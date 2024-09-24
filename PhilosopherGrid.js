const standardPhilosophers = [
  { name: 'Plato', scores: [2, 9, 10, 4, 5, 8], era: 'Ancient', region: 'Western', description: 'Classical Greek philosopher, founder of the Academy in Athens.' },
  { name: 'Aristotle', scores: [3, 8, 6, 5, 7, 9], era: 'Ancient', region: 'Western', description: 'Greek philosopher and scientist, founder of the Lyceum.' },
  { name: 'Confucius', scores: [2, 5, 7, 9, 6, 4], era: 'Ancient', region: 'Eastern', description: 'Chinese philosopher and politician of the Spring and Autumn period.' },
  { name: 'Augustine of Hippo', scores: [4, 8, 9, 3, 5, 7], era: 'Medieval', region: 'Western', description: 'Early Christian theologian and philosopher who influenced Western Christianity and philosophy.' },
  { name: 'René Descartes', scores: [4, 9, 7, 6, 5, 8], era: 'Early Modern', region: 'Western', description: 'French philosopher, mathematician, and scientist, often regarded as the father of modern Western philosophy.' },
  { name: 'Immanuel Kant', scores: [5, 7, 8, 5, 6, 7], era: 'Modern', region: 'Western', description: 'German philosopher who is a central figure in modern philosophy.' },
  { name: 'Friedrich Nietzsche', scores: [8, 5, 4, 9, 7, 6], era: 'Modern', region: 'Western', description: 'German philosopher, cultural critic, composer, poet, and philologist.' },
  { name: 'Jean-Paul Sartre', scores: [9, 6, 5, 7, 8, 4], era: 'Contemporary', region: 'Western', description: 'French philosopher, playwright, novelist, political activist, biographer, and literary critic.' },
  { name: 'Simone de Beauvoir', scores: [8, 5, 6, 7, 7, 5], era: 'Contemporary', region: 'Western', description: 'French writer, intellectual, existentialist philosopher, political activist, feminist, and social theorist.' },
  { name: 'Michel Foucault', scores: [7, 4, 5, 8, 6, 3], era: 'Contemporary', region: 'Western', description: 'French philosopher, historian of ideas, social theorist, and literary critic.' },
  // Plaatshouders voor de overige 90 filosofen
  ...Array(90).fill(null).map((_, index) => ({
    name: `Philosopher ${index + 11}`,
    scores: Array(6).fill(0).map(() => Math.floor(Math.random() * 11)),
    era: ['Ancient', 'Medieval', 'Early Modern', 'Modern', 'Contemporary'][Math.floor(Math.random() * 5)],
    region: ['Western', 'Eastern', 'Middle Eastern'][Math.floor(Math.random() * 3)],
    description: 'Description placeholder. Replace with actual philosopher description.'
  }))
];

const axes = [
  "Existentialisme - Essentialisme",
  "Empirisme - Rationalisme",
  "Idealisme - Materialisme",
  "Individualistisch - Collectivistisch",
  "Determinisme - Vrije wil",
  "Realisme - Anti-realisme"
];

const Dropdown = ({ value, onChange, options, multiple = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        {multiple ? `${value.length} selected` : value}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {multiple && (
            <>
              <div
                className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                onClick={() => {
                  onChange(options);
                  setIsOpen(false);
                }}
              >
                Select all
              </div>
              <div
                className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                onClick={() => {
                  onChange([]);
                  setIsOpen(false);
                }}
              >
                Select none
              </div>
            </>
          )}
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
              onClick={() => {
                if (multiple) {
                  onChange(
                    value.includes(option)
                      ? value.filter(item => item !== option)
                      : [...value, option]
                  );
                } else {
                  onChange(option);
                  setIsOpen(false);
                }
              }}
            >
              {multiple ? (
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => {}}
                  className="mr-2"
                />
              ) : null}
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const PhilosopherGrid = () => {
  const [xAxis, setXAxis] = React.useState(axes[0]);
  const [yAxis, setYAxis] = React.useState(axes[1]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [eraFilter, setEraFilter] = React.useState('All');
  const [regionFilter, setRegionFilter] = React.useState('All');
  const [selectedPhilosopher, setSelectedPhilosopher] = React.useState(null);
  const [selectedPhilosophers, setSelectedPhilosophers] = React.useState(standardPhilosophers.map(p => p.name));

  const eras = ['All', ...new Set(standardPhilosophers.map(p => p.era))];
  const regions = ['All', ...new Set(standardPhilosophers.map(p => p.region))];

  const filteredPhilosophers = standardPhilosophers.filter(p => 
    (eraFilter === 'All' || p.era === eraFilter) &&
    (regionFilter === 'All' || p.region === regionFilter) &&
    selectedPhilosophers.includes(p.name)
  );

  const handlePhilosopherClick = (philosopher) => {
    setSelectedPhilosopher(philosopher);
  };

  const jitter = (value) => {
    return value + (Math.random() - 0.5) * 0.5;
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-1">X-axis:</label>
          <Dropdown value={xAxis} onChange={setXAxis} options={axes} />
        </div>
        <div>
          <label htmlFor="y-axis" className="block text-sm font-medium text-gray-700 mb-1">Y-axis:</label>
          <Dropdown value={yAxis} onChange={setYAxis} options={axes} />
        </div>
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search philosopher:</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              className="w-full px-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter name..."
            />
            <span className="absolute right-3 top-2.5 h-5 w-5 text-gray-400">🔍</span>
          </div>
        </div>
        <div>
          <label htmlFor="era-filter" className="block text-sm font-medium text-gray-700 mb-1">Era:</label>
          <Dropdown value={eraFilter} onChange={setEraFilter} options={eras} />
        </div>
        <div>
          <label htmlFor="region-filter" className="block text-sm font-medium text-gray-700 mb-1">Region:</label>
          <Dropdown value={regionFilter} onChange={setRegionFilter} options={regions} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select philosophers:</label>
          <Dropdown 
            value={selectedPhilosophers} 
            onChange={setSelectedPhilosophers} 
            options={standardPhilosophers.map(p => p.name)}
            multiple={true}
          />
        </div>
      </div>
      <div className="w-full h-96 relative border border-gray-300 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-green-100"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-200"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-300"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-green-400"></div>
        
        {[...Array(11)].map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-white" style={{bottom: `${i * 10}%`}}></div>
        ))}
        {[...Array(11)].map((_, i) => (
          <div key={i} className="absolute w-px h-full bg-white" style={{left: `${i * 10}%`}}></div>
        ))}
        
        <div className="absolute bottom-0 left-0 w-full h-px bg-black"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-black"></div>
        
        {filteredPhilosophers.map((phil, index) => {
          const xIndex = axes.indexOf(xAxis);
          const yIndex = axes.indexOf(yAxis);
          const isHighlighted = phil.name.toLowerCase().includes(searchTerm.toLowerCase());
          return (
            <div
              key={index}
              className={`absolute w-3 h-3 rounded-full transition-all duration-500 ease-in-out cursor-pointer
                ${isHighlighted ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{
                left: `${jitter(phil.scores[xIndex] * 10)}%`,
                bottom: `${jitter(phil.scores[yIndex] * 10)}%`,
              }}
              onClick={() => handlePhilosopherClick(phil)}
            >
              <span className="absolute left-4 bottom-0 text-xs whitespace-nowrap bg-white px-1 rounded">{phil.name}</span>
            </div>
          );
        })}
      </div>
      {selectedPhilosopher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">{selectedPhilosopher.name}</h2>
            <p className="mb-2"><strong>Era:</strong> {selectedPhilosopher.era}</p>
            <p className="mb-2"><strong>Region:</strong> {selectedPhilosopher.region}</p>
            <p className="mb-4">{selectedPhilosopher.description}</p>
            <h3 className="font-semibold mb-2">Position on current axes:</h3>
            <p><strong>{xAxis}:</strong> {selectedPhilosopher.scores[axes.indexOf(xAxis)]}/10</p>
            <p><strong