import Link from 'next/link'
import Input from '@material-ui/core/Input'

const Styles = {
  input: {
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderRadius: 5,
    padding: '5px 10px',
  }
}

const SearchBar = ({ value, onChange, ref }) => {
  return (
    <div style={Styles.input}>
      <Input
        inputRef={(ref) => { ref = ref }}
        style={{ width: 200 }}
        placeholder={'Search'}
        onChange={onChange}
        defaultValue={value}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    </div>
  )
}

export default SearchBar