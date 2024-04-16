import { describe, expect, it } from 'vitest'
import { player as reducer, play, next, PlayerState } from './player'

const exampleState: PlayerState = {
  course: {
    id: 1,
    modules: [
      {
        id: 1,
        title: 'Starting with React',
        lessons: [
          { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
          { id: 'w-DW4DhDfcw', title: 'Post Styling', duration: '10:05' },
        ],
      },
      {
        id: 2,
        title: 'Application Structure',
        lessons: [
          { id: 'gE48FQXRZ_o', title: 'Comment Component', duration: '13:45' },
          { id: 'Ng_Vk4tBl0g', title: 'Responsiveness', duration: '10:05' },
        ],
      },
    ],
  },
  currentModuleIndex: 0,
  currentLesssonIndex: 0,
}

describe('player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exampleState, play([1, 2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLesssonIndex).toEqual(2)
  })

  it('should be able to play next video automatically', () => {
    const state = reducer(exampleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLesssonIndex).toEqual(1)
  })

  it('should be able to jump to the next module automatically', () => {
    const state = reducer({
      ...exampleState,
      currentLesssonIndex: 1,
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLesssonIndex).toEqual(0)
  })

  it('should not update the current and lesson if there is no next available ', () => {
    const state = reducer({
      ...exampleState,
      currentLesssonIndex: 1,
      currentModuleIndex: 1,
    }, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLesssonIndex).toEqual(1)
  })
})