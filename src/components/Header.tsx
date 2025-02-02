export function Header() {
  return (
    <div className="containerBox text-center flex flex-col items-center space-x-2 justify-center">
      <div className="flex space-x-2 items-center">
        <small></small>
        <h1 className="inline">Virtual machine</h1>
        <small>by <a target="__blank" href="https://github.com/thavixt/virtual-machine-sim">thavixt@github</a></small>
      </div>
      <div>
        <em><small>started out to become a simplified <a target="__blank" href="https://en.wikipedia.org/wiki/Turing_machine">Turing machine</a> - turned out to be something different</small></em>
      </div>
    </div>
  );
}
