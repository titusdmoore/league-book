// TODO: Update component to pull in valid venues and make it a select
import { TextField } from '@payloadcms/ui'
import type { TextFieldServerComponent } from 'payload'

const VenueSelectField: TextFieldServerComponent = ({
  clientField,
  path,
  schemaPath,
  permissions,
}) => {
  console.log(path, schemaPath)
  return (
    <TextField
      field={clientField}
      path={path}
      schemaPath={schemaPath}
      permissions={permissions}
    />
  )
}

export default VenueSelectField;
