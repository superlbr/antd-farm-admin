import { cloneDeep } from 'lodash'
import { Path, pathToRegexp } from 'path-to-regexp'

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array = [],
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result: any = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    const hashParent: any = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts: any, pathname: string) {
  let result = 'public'

  const isMatch = (regepx: Path) => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathToRegexp(regepx).exec(pathname)
  }

  for (const item of layouts) {
    let include = false
    let exlude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exlude) {
      for (const regepx of item.exlude) {
        if (isMatch(regepx)) {
          exlude = true
          break
        }
      }
    }

    if (include && !exlude) {
      result = item.name
      break
    }
  }

  return result
}
