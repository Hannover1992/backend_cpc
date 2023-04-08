export function get_id_from_request(req: any) {
    let id = parseInt(req.params.id);
    return id;
}

