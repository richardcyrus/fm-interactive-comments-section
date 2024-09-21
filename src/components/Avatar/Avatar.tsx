function Avatar(props: { username: string; imageUrl: string }) {
  return (
    <figure className="avatar h-8 w-8">
      <img
        src={`${import.meta.env.BASE_URL}${props.imageUrl}`}
        alt={`Avatar of ${props.username}`}
        className="h-full max-w-full rounded-full object-cover object-center"
      />
    </figure>
  )
}

export default Avatar
