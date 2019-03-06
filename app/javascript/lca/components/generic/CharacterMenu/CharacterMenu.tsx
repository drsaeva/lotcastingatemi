import * as React from 'react'

import { Divider, IconButton, Menu } from '@material-ui/core'
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import MoreVert from '@material-ui/icons/MoreVert'

import { useMenuLogic } from 'hooks'
import MenuBattlegroupFromQc from './MenuBattlegroupFromQc'
import MenuChangeExaltType from './MenuChangeExaltType.jsx'
import MenuDelete from './MenuDelete'
import MenuDuplicate from './MenuDuplicate'
import MenuEdit from './MenuEdit'
import MenuHide from './MenuHide'
import MenuLinks from './MenuLinks'
import MenuPin from './MenuPin'
import MenuRefresh from './MenuRefresh'
import MenuRemoveFromChronicle from './MenuRemoveFromChronicle.jsx'

// eslint-disable-next-line no-unused-vars
const styles = (theme: Theme) => ({
  headerWrapper: {},
  wrapper: {
    margin: '-0.75em -1em 0 1.5em',
  },
})

export type CharacterType = 'character' | 'qc' | 'battlegroup'

export interface MenuItemProps {
  id: number
  characterType: CharacterType
}

interface Props extends WithStyles<typeof styles> {
  id: number
  characterType: CharacterType
  header?: boolean
  chronicle?: boolean
}

const CharacterMenu = (props: Props) => {
  const { header, chronicle, characterType, id, classes } = props
  const [menuAnchor, handleOpen, handleClose] = useMenuLogic()

  return (
    <div className={header ? classes.headerWrapper : classes.wrapper}>
      <IconButton onClick={handleOpen} data-cy="character-menu" color="inherit">
        <MoreVert />
      </IconButton>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={handleClose}>
        {!header && [
          <MenuLinks key="links" characterType={characterType} id={id} />,
          <MenuEdit key="edit" characterType={characterType} id={id} />,
        ]}

        <MenuPin characterType={characterType} id={id} />

        <MenuHide characterType={characterType} id={id} />

        <MenuRemoveFromChronicle characterType={characterType} id={id} />

        <MenuDuplicate characterType={characterType} id={id} />

        <MenuBattlegroupFromQc characterType={characterType} id={id} />

        <Divider />
        <MenuRefresh characterType={characterType} id={id} />

        {!chronicle && [
          <MenuChangeExaltType
            key="change"
            characterType={characterType}
            id={id}
          />,

          <Divider key="div" />,

          <MenuDelete key="del" characterType={characterType} id={id} />,
        ]}
      </Menu>
    </div>
  )
}

const enhance = withStyles(styles)

export default enhance(CharacterMenu)
