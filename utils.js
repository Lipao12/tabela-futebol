// utils.js

export function ordenarTimes(times) {
    return times.sort((a, b) => {
        if ((a.vitorias*3 + a.empates) > (b.vitorias*3 + b.empates)) {
            return -1;
        } else if ((a.vitorias*3 + a.empates) < (b.vitorias*3 + b.empates)) {
            return 1;
        } else {
            if ((a.golsFeitos - a.golsTomados) > (b.golsFeitos - b.golsTomados)) {
                return -1;
            } else if ((a.golsFeitos - a.golsTomados) < (b.golsFeitos - b.golsTomados)) {
                return 1;
            } else {
                return 0;
            }
        }
    });
}
