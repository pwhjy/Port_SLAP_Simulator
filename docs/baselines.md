# Baseline algorithms

We include simulated annealing (SA) and mixed-integer programming (MIP)
reference implementations. They consume the same seven-element tuple
returned by `DB.init_instance_for_baseline()`:

1. containers waiting in the planning buffer;
2. candidate slots grouped by vessel, block, and size;
3. lower-stack weight information aligned with those slots;
4. current vessel counts per block;
5. current rehandle counts;
6. remaining capacity per bay;
7. mutually conflicting bays caused by container-size rules.

## Installation smoke tests

The bundled toy instance has two synthetic containers, two synthetic blocks,
and no database dependency:

```bash
python -m pip install -c constraints.txt -e '.[dev]'
python examples/sa_baseline.py

python -m pip install -c constraints.txt -e '.[ortools,dev]'
python examples/mip_baseline.py
pytest -m ortools tests/test_baseline_algorithms.py
```

OR-Tools is the recommended reproducible MIP backend. Gurobi and CPLEX remain
optional and require their own installations and licenses.

## Database-backed planning

Start MySQL and initialize the synthetic episode before requesting a baseline
instance:

```python
from pathlib import Path

from port_slap.algorithms.baseline.merged_SA import gen_solution_SA
from port_slap.simulation.database import DB

config = Path("configs/example.ini").resolve()
db = DB(str(config))
try:
    db.Initall(dump=False)
    baseline_input = db.init_instance_for_baseline(num=2)
    solution = gen_solution_SA(
        baseline_input,
        str(config),
        one_times=10,
        all_times=40,
        seed=20260720,
    )
finally:
    db.close()
```

The returned slots use `(block, bay, stack, tier)` where `tier` is the current
top tier expected by `DB.updata_and_slot`. Validate a complete plan before
applying it to the database.
