'use strict';
import * as Backbone from 'backbone';

export class AtomicOperationTracker extends Backbone.Model {

    constructor() {
        super()
        this.set('ATOMIC_OPERATION', false)
    }

    _startAtomicOperation () {
        this.set('ATOMIC_OPERATION', true);
    }

    _endAtomicOperation () {
        this.set('ATOMIC_OPERATION', false);
    }

    atomicOperationUnderway (): boolean {
        return this.get('ATOMIC_OPERATION');
    }

    atomicOperationFinished (): boolean {
        return !this.get('ATOMIC_OPERATION');
    }

    atomicOperation <T extends Function>(f: T) : any {
        // calls f ensuring that the atomic operation is set throughout.

        const wrapped = function (...args) {
            if (!atomic.atomicOperationUnderway()) {
                // we are the highest level atomic lock. Code inside should be
                // called with a single atomic lock wrapped around it.

                // console.log('Starting atomic operation');
                atomic._startAtomicOperation();
                f.apply(this, args);
                // console.log('Ending atomic operation');
                atomic._endAtomicOperation();
            } else {
                // we are nested inside some other atomic lock. Just call the
                // function as normal.
                f.apply(this, args);
            }
        }

        return wrapped
    }

}
export const atomic = new AtomicOperationTracker()
