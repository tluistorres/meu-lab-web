export class TreeNode<T> {
    public left: TreeNode<T> | null = null;
    public right: TreeNode<T> | null = null;
    constructor(public key: T) {}
}