// import {
//   TransitionProps,
//   addTransitionClass,
//   removeTransitionClass,
//   ElementWithTransition,
//   getTransitionInfo,
//   resolveTransitionProps,
//   TransitionPropsValidators,
// } from './Transition'
import {
  Fragment,
  VNode,
  warn,
  resolveTransitionHooks,
  useTransitionState,
  getTransitionRawChildren,
  getCurrentInstance,
  setTransitionHooks,
  createVNode,
  onUpdated,
  PropType,
  defineComponent,
  watch,
} from '@vue/runtime-core'
import { reactive, toRaw, toRefs } from '@vue/reactivity'
import { SpringConfig } from './presets'
import { useSpring } from './motion'

interface Position {
  top: number
  left: number
}

const positionMap = new WeakMap<VNode, Position>()
const newPositionMap = new WeakMap<VNode, Position>()

export interface SpringGroupProps {
  config?: SpringConfig
  tag?: string
}

const TransitionGroupImpl = defineComponent({
  name: 'TransitionGroup',

  props: {
    config: Object as PropType<SpringConfig>,
    tag: String,
  },

  setup(props, { slots }) {
    const instance = getCurrentInstance()!
    const state = useTransitionState()
    // TODO: const positions = useSprings(childrenKeys, {x: 0, y:0})
    const pos1 = useSpring({ x: 0, y: 0 })
    const pos2 = useSpring({ x: 0, y: 0 })
    const pos3 = useSpring({ x: 0, y: 0 })
    const pos4 = useSpring({ x: 0, y: 0 })
    const positions = {
      Ipsum: pos1,
      Lorem: pos2,
      Dolor: pos3,
      Sit: pos4,
    } as Record<string, { x: number; y: number }>
    let prevChildren: VNode[]
    let children: VNode[]

    // @ts-ignore
    window.pos2 = pos2

    watch(
      () => pos2,
      () => {
        const name = 'Lorem'
        console.log('watch pos2')
        const child = children.find((c) => c.key === name)
        if (!child) {
          console.log('not found', name)
        } else {
          const s = (child.el as HTMLElement).style
          const dx = pos2.x
          const dy = pos2.y
          if (name === 'Lorem') console.log('watch Lorem', { dx, dy })
          s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`
        }
      },
      { deep: true, flush: 'post' }
    )

    // watch(
    //   () => [pos1, pos2, pos3, pos4],
    //   () => {
    //     console.log('trigger')
    //     for (const name in positions) {
    //       const child = children.find((c) => c.key === name)
    //       if (!child) {
    //         console.log('not found', name)
    //       } else {
    //         const s = (child.el as HTMLElement).style
    //         const dx = positions[name].x
    //         const dy = positions[name].y
    //         if (name === 'Lorem') console.log('Lorem', { dx, dy })
    //         s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`
    //       }
    //     }
    //   },
    //   { deep: false, flush: 'post' }
    // )

    onUpdated(() => {
      // children is guaranteed to exist after initial render
      if (!prevChildren.length) {
        return
      }
      // const moveClass = props.moveClass || `${props.name || 'v'}-move`

      // if (
      //   !hasCSSTransform(
      //     prevChildren[0].el as ElementWithTransition,
      //     instance.vnode.el as Node,
      //     moveClass
      //   )
      // ) {
      //   return
      // }

      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      // prevChildren.forEach(callPendingCbs)
      prevChildren.forEach(recordPosition)
      const movedChildren = prevChildren.filter((c) =>
        applyTranslation(c, positions)
      )

      // force reflow to put everything in position
      forceReflow()

      movedChildren.forEach((c) => {
        const el = c.el as HTMLElement
        // const style = el.style
        // addTransitionClass(el, moveClass)
        setTimeout(() => {
          pos2.x = 0
          pos2.y = 0
          // positions[c.key!].x = 0
          // positions[c.key!].y = 0
          console.log('moved', c.key)
        }, 1000)
        // style.transform = style.webkitTransform = style.transitionDuration = ''
        const cb = ((el as any)._moveCb = (e: TransitionEvent) => {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener('transitionend', cb)
            ;(el as any)._moveCb = null
            // removeTransitionClass(el, moveClass)
          }
        })
        el.addEventListener('transitionend', cb)
      })
    })

    return () => {
      const rawProps = toRaw(props)
      // const cssTransitionProps = resolveTransitionProps(rawProps)
      const tag = rawProps.tag || Fragment
      prevChildren = children
      children = slots.default ? getTransitionRawChildren(slots.default()) : []

      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        if (child.key != null) {
          // setTransitionHooks(
          //   child,
          //   resolveTransitionHooks(child, {}, state, instance)
          // )
        } else if (__DEV__) {
          warn(`<TransitionGroup> children must be keyed.`)
        }
      }

      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i]
          // setTransitionHooks(
          //   child,
          //   resolveTransitionHooks(child, {}, state, instance)
          // )
          positionMap.set(child, (child.el as Element).getBoundingClientRect())
          console.log(
            'saved before render',
            child.key,
            (child.el as Element).getBoundingClientRect()
          )
        }
      }

      return createVNode(tag, null, children)
    }
  },
})

export const SpringGroup = (TransitionGroupImpl as unknown) as {
  new (): {
    $props: SpringGroupProps
  }
}

function callPendingCbs(c: VNode) {
  const el = c.el as any
  if (el._moveCb) {
    el._moveCb()
  }
  if (el._enterCb) {
    el._enterCb()
  }
}

function recordPosition(c: VNode) {
  newPositionMap.set(c, (c.el as Element).getBoundingClientRect())
  console.log(
    'saved after render',
    c.key,
    (c.el as Element).getBoundingClientRect()
  )
}

function applyTranslation(c: VNode, positions: any): VNode | undefined | void {
  const oldPos = positionMap.get(c)!
  const newPos = newPositionMap.get(c)!
  const dx = oldPos.left - newPos.left
  const dy = oldPos.top - newPos.top
  // @ts-ignore
  if (c.key === 'Lorem') pos2.reset({ x: dx, y: dy })
  // positions[c.key!].reset({ x: dx, y: dy })
  // positions[c.key!].x = dx
  // positions[c.key!].y = dy
  console.log('reset', c.key, { ...positions[c.key!] })
  if (dx || dy) {
    const s = (c.el as HTMLElement).style

    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`
    s.transitionDuration = '0s'
    return c
  }
}

// this is put in a dedicated function to avoid the line from being treeshaken
function forceReflow() {
  return document.body.offsetHeight
}

// function hasCSSTransform(
//   el: ElementWithTransition,
//   root: Node,
//   moveClass: string
// ): boolean {
//   // Detect whether an element with the move class applied has
//   // CSS transitions. Since the element may be inside an entering
//   // transition at this very moment, we make a clone of it and remove
//   // all other transition classes applied to ensure only the move class
//   // is applied.
//   const clone = el.cloneNode() as HTMLElement
//   if (el._vtc) {
//     el._vtc.forEach((cls) => {
//       cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c))
//     })
//   }
//   moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c))
//   clone.style.display = 'none'
//   const container = (root.nodeType === 1
//     ? root
//     : root.parentNode) as HTMLElement
//   container.appendChild(clone)
//   const { hasTransform } = getTransitionInfo(clone)
//   container.removeChild(clone)
//   return hasTransform
// }
