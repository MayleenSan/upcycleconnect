package bdd

func nullIfZero(id int) interface{} {
	if id == 0 {
		return nil
	}
	return id
}
